pipeline {
    agent any
    environment {
        WEBSITE_MOUNT = '/website/prerollplus'
        BUILD_CRED = credentials('74d13a39-2cb5-4c34-b92c-3137e46bf881')
        WORK_DIR = credentials('external_dir')
    }
    options {
        timeout(time: 10, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }
    stages {
        stage('Build') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def buildNum = sh(script: 'curl -s https://increment.build/${BUILD_CRED} || echo "manual"', returnStdout: true).trim()
                    echo "Build number: ${buildNum}"

                    def hostWorkspace = WORKSPACE.replace('/var/jenkins_home', WORK_DIR)

                    sh """
                        docker run --rm \
                          -v "${hostWorkspace}":/app \
                          -w /app \
                          -e BUILD_NUMBER=${buildNum} \
                          node:20-alpine \
                          sh -c "npm ci && npm run build"
                    """
                }
            }
        }
        stage('Deploy to Filesystem') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    command -v rsync >/dev/null 2>&1 || (apt-get update && apt-get install -y rsync)

                    rsync -av --delete build/ ${WEBSITE_MOUNT}/
                    touch ${WEBSITE_MOUNT}/index.html
                """
            }
        }
    }
}

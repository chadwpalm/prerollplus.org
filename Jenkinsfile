pipeline {
    agent any
    environment {
        WEBSITE_MOUNT = '/website/prerollplus'
        BUILD_CRED = credentials('74d13a39-2cb5-4c34-b92c-3137e46bf881')
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

                    // Jenkins runs in a container, so share its volumes with the build
                    // container. The workspace then has the same path in both.
                    sh """
                        docker run --rm \
                          --volumes-from "\$(hostname)" \
                          -w "${WORKSPACE}" \
                          -e BUILD_NUMBER=${buildNum} \
                          node:26-alpine \
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
                    find ${WEBSITE_MOUNT} -mindepth 1 -delete
                    cp -a build/. ${WEBSITE_MOUNT}/
                    touch ${WEBSITE_MOUNT}/index.html
                """
            }
        }
    }
}

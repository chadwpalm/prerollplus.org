pipeline {

  agent any

  environment {
      WEBSITE_MOUNT = "/website"
      BUILD_CRED = credentials('74d13a39-2cb5-4c34-b92c-3137e46bf881')
  }

  options {
      timeout (time: 10, unit: 'MINUTES')
      buildDiscarder (logRotator (numToKeepStr: '3'))
  }

  stages { 
    stage('Build') {
      when {
        branch "main"
      }
    //   agent {
    //     docker {
    //       image 'node:20-alpine'
    //       args '--user root'
    //     }
    //   }
      steps {
        sh """
        docker run --rm \
          -v "$(pwd)":/app \
          -w /app \
          -e BUILD_NUMBER=$(curl -s https://increment.build/${BUILD_CRED} || echo "manual") \
          node:20-alpine \
        sh -c "npm ci && npm run build"
        """
      }
    }

    stage('Deploy to Filesystem') {
      when {
        branch "main"
      }
      steps {      
        sh """
          rsync -av --delete build/ ${WEBSITE_MOUNT}/

          touch ${WEBSITE_MOUNT}/index.html
        """
      }
    }
  }
}
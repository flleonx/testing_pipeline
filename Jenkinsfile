// Function to validate that the message returned from SonarQube is ok

def qualityGateValidation(qg) {
  if (qg.status != 'OK') {
    return true
  }

  return false
}

pipeline {
  agent any

  tools {
    nodejs 'nodejs'
  }

  environment {

    PROJECT_ROOT = './'

  }

  stages {
    stage('Hello') {
      steps {
        echo '=== This is my Pipeline ==='
      }
    }

    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/flleonx/testing_pipeline.git']]])
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm --version'
        sh "npm install"
      }
    }

    stage('Unit tests') {
      steps {
        sh "npm run test"
      }
    }

    stage('Generate coverage report') {
      steps {
        sh "npm run coverage"
      }
    }

    stage('Scan') {

      environment {
        scannerHome = tool 'sonar-scanner'
      }

      steps {
        withSonarQubeEnv('sonarqube') {
          sh "${scannerHome}/bin/sonar-scanner \
              -Dsonar.projectKey=SimpleExpressExample:Test \
              -Dsonar.projectName=SimpleExpressExample \
              -Dsonar.projectVersion=0.0.${BUILD_NUMBER} \
              -Dsonar.host.url=http://mysonarqube:9000 \
              -Dsonar.sources=./app.js,./models \
              -Dsonar.login=admin \
              -Dsonar.password=flleonx \
              -Dsonar.test=./test \
              -Dsonar.javascript.lcov.reportPaths=./coverage.lcov.info"
        }
        timeout(time: 3, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: qualityGateValidation(waitForQualityGate())
        }
      }
    }

    stage('Build docker-image') {
      steps {
        sh "docker build -t testing_pipeline:${BUILD_NUMBER} ."
      }
    }
  }
}

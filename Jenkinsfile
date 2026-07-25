pipeline {
    agent any
    
    tools {
        nodejs 'Node22'
    }
    
    environment {
        NX_BASE = 'HEAD~1'
        NPM_CONFIG_UPDATE_NOTIFIER = 'false'
    }
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci --legacy-peer-deps'
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Running linting for affected projects...'
                sh 'npx nx affected -t lint'
            }
        }
        
        stage('Security Audit') {
            steps {
                echo 'Running security scan on dependencies...'
                sh 'npm audit --audit-level=high || true'
                echo 'Running container image scan...'
                // sh 'trivy image dedisalam/frontend:latest'
                echo '(Placeholder) Trivy scan will run here'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running unit tests for affected projects...'
                sh 'npx nx affected -t test'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building affected projects...'
                sh 'npx nx affected -t build'
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                echo 'Building and pushing frontend images...'
                sh 'docker build -t dedisalam/frontend-web:latest -f docker/web/Dockerfile.prod .'
                
                sh 'docker push dedisalam/frontend-web:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to local Docker host...'
                // Unduh compose file terbaru lalu tarik image dan restart kontainer web
                sh 'curl -sO https://raw.githubusercontent.com/dedisalam/backend/master/docker-compose.prod.yml'
                sh 'docker compose -p fullstack -f docker-compose.prod.yml pull web && docker compose -p fullstack -f docker-compose.prod.yml up -d web'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}

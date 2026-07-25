pipeline {
    agent any
    
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
                sh 'docker build -t dedisalam/fullstack-web:latest -f docker/web/Dockerfile.prod .'
                
                sh 'docker push dedisalam/fullstack-web:latest'
            }
        }
        
        stage('Deploy (Webhook)') {
            steps {
                echo 'Triggering deployment webhook on remote server...'
                // Pastikan environment variable WEBHOOK_URL_FRONTEND diisi di setting Jenkins jika ada URL spesifik
                sh 'curl -X POST ${WEBHOOK_URL_FRONTEND} || echo "No webhook triggered"'
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

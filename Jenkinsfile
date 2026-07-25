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
        
        stage('Deploy') {
            steps {
                echo 'Deploying to remote server via SSH...'
                // Menarik image terbaru dari Docker Hub dan me-restart container
                sh 'ssh -o StrictHostKeyChecking=no dedisalam@172.16.254.2 "cd ~/fullstack/backend && docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up -d"'
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

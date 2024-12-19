pipeline {
    agent any
    environment {
        DOCUMENT_ROOT = "/var/www/html/jenkins-site"
    }
    triggers {
        githubPush() // Triggered by GitHub webhook
    }
    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }
        stage('Deploy to Apache') {
            steps {
                script {
                    def htmlFile = findFiles(glob: '*.html')[0]
                    if (htmlFile) {
                        sh """
                        sudo cp ${htmlFile.path} ${env.DOCUMENT_ROOT}/index.html
                        sudo chown www-data:www-data ${env.DOCUMENT_ROOT}/index.html
                        """
                        echo "HTML file deployed successfully!"
                    } else {
                        error "No HTML file found in the repository!"
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

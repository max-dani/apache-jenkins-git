pipeline {
    agent any

    environment {
        DEPLOY_PATH = '/var/www/html/react-app'  // Path on Apache server
        NODE_HOME = '/usr'  // Adjust if Node.js path differs
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Change directory to shopping-app before running npm install
                    dir('shopping-app') {
                        sh "${NODE_HOME}/bin/npm install"
                    }
                }
            }
        }

        stage('Build App') {
            steps {
                script {
                    // Change directory to shopping-app before building the app
                    dir('shopping-app') {
                        sh "${NODE_HOME}/bin/npm run build"
                    }
                }
            }
        }

        stage('Deploy to Apache') {
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'AWS_Apache',  // Preconfigured in Jenkins
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'shopping-app/build/**',
                                        remoteDirectory: DEPLOY_PATH,
                                        cleanRemote: true
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Access your app at: http://34.227.32.17/"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}

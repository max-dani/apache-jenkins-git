pipeline {
    agent any

    environment {
        DEPLOY_PATH = '/var/www/html'
        BRANCH_NAME = 'tourism_site' // Use branch-specific subdirectories
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Apache') {
             steps {
                script {
                    def deployPath = "/var/www/html/${env.BRANCH_NAME}"
                    
                    // Recreate branch-specific directory
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'AWS_Apache',
                                transfers: [
                                    sshTransfer(
                                        execCommand: """
                                            sudo rm -rf ${deployPath} && \
                                            sudo mkdir -p ${deployPath} && \
                                            sudo chmod 755 ${deployPath}
                                        """
                                    )
                                ]
                            )
                        ]
                    )
        
                    // Deploy files to branch directory
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'AWS_Apache',
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: '**',
                                        remoteDirectory: "${deployPath}",
                                        removePrefix: '',
                                        execCommand: "sudo chmod -R 644 ${deployPath}/*"
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
            echo "Deployment successful!"
            echo "Access your site at http://34.227.32.17/${env.BRANCH_NAME}/"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}

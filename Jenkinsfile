pipeline {
    agent any

    environment {
        DEPLOY_PATH = '/var/www/html'
        BRANCH_NAME = "${env.BRANCH_NAME}" // Use branch-specific subdirectories
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
                    def deployPath = "${DEPLOY_PATH}/${BRANCH_NAME}"

                    // Ensure the branch-specific directory exists
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'AWS_Apache',
                                transfers: [
                                    sshTransfer(
                                        execCommand: """
                                            mkdir -p ${deployPath}
                                            chmod 755 ${deployPath}
                                        """
                                    )
                                ]
                            )
                        ]
                    )

                    // Transfer the files to the Apache server
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'AWS_Apache',
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: '**/*',
                                        removePrefix: '',
                                        remoteDirectory: "${deployPath}",
                                        execCommand: """
                                            chmod -R 644 ${deployPath}
                                            echo "Deployment successful to ${deployPath}"
                                        """
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

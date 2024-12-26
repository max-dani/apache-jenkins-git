pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/max-dani/apache-jenkins-git.git'
            }
        }
        stage('Build') {
            steps {
                // Add any build steps if necessary
                echo 'Building...'
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'apache-server',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**/*',
                                    removePrefix: '',
                                    remoteDirectory: '/var/www/html',
                                    execCommand: 'sudo systemctl restart apache2'
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}

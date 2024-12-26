pipeline {
    agent any

    stages {
                stage('Clone Repository') { steps { git branch: 'main', url: 'https://github.com/max-dani/apache-jenkins-git.git' } }
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
                            configName: 'AWS_Apache',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: '**/*',
                                    removePrefix: '',
                                    remoteDirectory: '/var/www/html/tourism_website',
                                    execCommand: '''
                                        mkdir -p /var/www/html/tourism_website
                                        cp -r /var/www/html/tourism_website
                                        chmod 644 /var/www/html/tourism_website
                                        sudo systemctl restart apache2
                                    '''
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}

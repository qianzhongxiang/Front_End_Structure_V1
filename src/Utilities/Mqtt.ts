export interface MqttConfig {
    username?: string;
    password?: string;

}
export class MqttConfigBuilder {
    private confi: MqttConfig = {}
    constructor() {

    }
    WithCredentials(username: string, password: string) {

    }

    Build() {

    }
}
export class Mqtt {
    constructor(mqttInfo: string, init: MqttConfig) {

    }
}
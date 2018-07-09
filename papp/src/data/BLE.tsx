import { BleManager } from 'react-native-ble-plx';

export class DeviceManager {
  constructor() {
    console.log("initializing device manager...");

    // create BleManager to scan devices
    this.bleManager = new BleManager();
    const subscription = this.bleManager.onStateChange((state) => {
        console.log("Bluetooth state: " + state);
        if (state === 'PoweredOn') {
            // this.scanAndConnect();
            subscription.remove();
        }
    }, true);
  }
}

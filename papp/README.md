This project is setup by copying example of
https://github.com/janaagaard75/expo-and-typescript

Thanks for setup to save time to combine Expo & Typescript.

# Dev:
## run packager "yarn start"
## run on simulator "exp ios" or "exp android"

# TODO:
## Build on top of Expo https://expo.io/features
## Libraries to build app in TypeScript https://microsoft.github.io/reactxp/
## React-Native basics https://facebook.github.io/react-native/docs/tutorial.html
## Nice talk on TypeScript https://www.typescriptlang.org/
## React-Native BLE https://github.com/Polidea/react-native-ble-plx
## Redux-persist https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975

# Backend
## Use AWS-amplify for all backend persistence https://docs.aws.amazon.com/aws-mobile/latest/developerguide/react-native-access-databases.html
### awsmobile configure to specify access keys.
### awsmobile start to initialize the project to have source configs

### init awsmobile console to work with backend
console complains about
"you are not working inside a valid awsmobilejs project"

> "awsmobile init b40a98a0-c351-41d0-9445-e26b6a2fc05f"
> cp awsmobilejs/#current*/aws-export.js src/aws-export.js

### test lambda / API
go to lambda console and use the test button to ensure it works.

# XCODE
To integrate with bluetooth lib, we need "exp detach" to run it with native
However, it took me several days to fight with build pass and make it run
A few tips that might help:
> "remove xcode cache" rm -rf ~/Library/Developer/Xcode/DerivedData
> reinstall pod "pod deintegrate && pod cache clean --all"
> make sure clean run of  "pod setup --verbose && pod install --verbose"

Another tip, it is possible open the project in Xcode with ".xcworkspace"
rather than "powerless.xcodeproj" which likely cause problem (don't know why)

Also - always use yarn install rather than npm install

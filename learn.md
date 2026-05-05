check this website for more leaning in components - https://reactnative.dev/docs/text#numberoflines

https://www.youtube.com/watch?v=J2j1yk-34OY - Set Up React Native
https://docs.expo.dev/router/installation/

npx create-expo-app projectName - create new project .
npm run reset-project - this reset the project
Reminder = if you want to use components make sure that you import that.

<Stack screenOptions={{ headerShown: false }} /> - this remove the index header.

View - is like a dev in html

SafeAreaView - is preventing the text hide to the notch in ios device but you must remove the view to make this pros work.

<TouchableHighlight>, <TouchableWithoutFeedback>, <TouchableOpacity>- to activate touchableHighlight is only work with onPress

<Image source={required ('./asset/icon.png')} /> -this is load the image from you local.

onPress={() => alert('this button is click)} - onPress is like addEventListener (click) in Javascript.

Customize Alert :
Alert.alert('title', 'message', [
{text : 'yes', onPress : () => console.log('yes')},
{text : 'no', onPress : () => console.log('No')} - i use onPress to know what button is click.
]).
<Button
title="Click Me"
onPress={() =>
Alert.alert('My Title', 'My Message', [
{text: 'Yes', onPress : () => console.log('Yes')},
{text: 'No', onPress: () => console.log('no')}
])
} ></Button>

<button onPress{() => console.log('click)}> - this is how buttons work

paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0, - this code use Platform Api so that we can custom the padding ios or android then i also use StatusBar..currentHeight so it can be depends on the android device.

<Image
'put here the pros you want to add fadeDuration:{300}'
source={
width: 200,
height: 200,
{uri: 'paste here the url ' }} /> - Reminder : you must add height and width to display unlike local image it automatic it display base on the original dimension.

<Text numberOfLines={value} > - this numberOfLines make your paragraph one line or depends on what value yuo put.

layout:
orientation : 'default' - this make your orientation depends on the device orientation

const {width , height } = Dimensions.get('window') - this declaration is use to depends on the dimension on the device screen and you can use that in any style.

useDeviceOrientation - this useful to adopt any device orientation.
const landscape = useDeviceOrientation();
return (
<SafeAreaView style={styles.container}>
<View style={{
backgroundColor:"blue",
width : '100%',
height: landscape ? "100%" : "30%"

flexbox -
flex : 1 - entire screen on the device and 0.5 is the haft the screen
flex-start → items stick to the left.
flex-end → items stick to the right.
center → items stay in the middle.
space-between → items spread out, edges filled.
space-around → equal space around each item.
space-evenly → equal space everywhere.

alignContent - is like align items but this only work if there is flexWrap.

flexDirection - maintain the space between the child then if there another child it display in in the next page.

flexBasis: 100, - if there is no with it full the width on the child (vice_versa).

useState () → holds the value
onChangeText {} - Trigger when use is input.

// KeyboardAvoidingView: - moves content up when keyboard appears
// ScrollView: - allows scrolling if keyboard covers inputs
// keyboardShouldPersistTaps="handled": - lets you tap outside inputs to dismiss keyboard
// behavior: - uses "padding" for iOS and "height" for Android to handle keyboard properly
// showsVerticalScrollIndicator={false} - hide the scrollbar in scrollView

keyboardType="email-address" - this automatic your keyboard set to email

email validator - but you
if (!validateEmailWithLibrary(email)) {
alert('invalid Email');
return;
}

<KeyboardAvoidingView
style={{ flex: 1, padding: 20 }}
behavior={Platform.OS === "ios" ? "padding" : "height"} // move content up for keyboard >
<ScrollView keyboardShouldPersistTaps="handled">

SIDE BAR CODES..
// Custom drawer component that defines how the drawer will look and behave
function CustomDrawerContent(props: any) {
return (
// A scrollable container for the drawer items (handles safe area, gestures, etc.). Remember if you create costume drawer make sure that is not is the same folder.
<DrawerContentScrollView {...props}> 3 dots means that is spreed to all folder.

      {/* Default Drawer Items (the screens you define with <Drawer.Screen>, like Home & History) */}
      <DrawerItemList {...props} />

      {/* Extra Drawer Item: Favorites (not a screen, but a shortcut/action) */}
      <DrawerItem
        label="Favorites" // Text displayed in the drawer
        onPress={() => props.navigation.navigate('favorites')} // Go to the 'favorites' screen when clicked
        icon={({ color, size }) => ( // Icon shown beside the label
          <Ionicons name="heart" size={size} color={color} />
        )}
      />

      {/* Extra Drawer Item: Logout (special action to go back to LoginScreen) */}
      <DrawerItem
        label="Logout" // Text displayed in the drawer
        onPress={() => {
          router.push('/auth/LoginScreen'); // Navigate to the LoginScreen when clicked
        }}
        icon={({ color, size }) => ( // Icon for the Logout option
          <Ionicons name="log-out-outline" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>

);
}

return (
<GestureHandlerRootView style={{ flex: 1 }}>
<Drawer
drawerContent={(props) => <CustomDrawerContent {...props} />}
screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: 'black',
          drawerActiveBackgroundColor: '#0D133D',
          drawerInactiveBackgroundColor: 'transparent',
          drawerItemStyle: {
            borderRadius: 18,
            marginVertical: 2,
            paddingHorizontal: 10,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
        }} >
{'Display the Home Screen Part'}
<Drawer.Screen
name="Home"
options={{
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
/>

        {'Display  the History part'}
        <Drawer.Screen
          name="history"
          options={{
            title: 'History',
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="history" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>

);
}

Header Properties
headerShown → show/hide the header (true /false)
headerStyle → style the header background (color, shadow, etc.)
headerTintColor → color of back button + icons
headerTitleStyle → style for the title text
title → text shown as the title
headerTitle → custom React component as title
headerLeft → custom element on the left (e.g., back button, icon)
headerRight → custom element on the right (e.g., settings button)
headerBackTitle → text shown for the back button (iOS)
headerBackTitleStyle → style for back button text
headerBackImageSource → custom back button icon/image
headerTransparent → make header background transparent
headerBackground → custom background (e.g., gradient, image)
headerShadowVisible → show/hide bottom shadow under header
headerTitleAlign → align title (left, center)
headerLargeTitle → large iOS-style header
headerLargeTitleStyle → style for large header title
headerLargeTitleShadowVisible → show/hide shadow under large header
headerBackVisible → show/hide back button
headerBlurEffect → add blur effect to header (iOS only)

Drawer.Screen Properties
name → unique name for the screen (used in navigation)
component → the React component to render for this screen
options → configure screen-specific options (title, icon, etc.)
title → text shown in drawer for this screen
drawerLabel → custom label text (instead of title)
drawerIcon → custom icon (usually a function returning an icon)
drawerLabelStyle → style for the label text
drawerItemStyle → style for the item container
drawerActiveTintColor → text/icon color when active
drawerInactiveTintColor → text/icon color when inactive
drawerActiveBackgroundColor → background color when active
drawerInactiveBackgroundColor → background color when inactive
swipeEnabled → enable/disable swipe to open drawer
gestureEnabled → enable/disable gestures for screen
unmountOnBlur → unmount screen when not focused (saves memory)

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState,useRef, useEffect} from 'react';
import type {Node} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    Animated, 
    Easing,
    RefreshControl
} from 'react-native';
import {Header as HeaderRNE, HeaderProps, Icon, Button} from '@rneui/themed';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Slider } from "@rneui/themed";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Card,TextInput } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import CryptoJS from "react-native-crypto-js";
import LottieView from "lottie-react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { color } from 'react-native-reanimated';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { TextInputAffix } from 'react-native-paper/lib/typescript/components/TextInput/Adornment/TextInputAffix';


const data = [
    {
        label: 'RED',
        value: '1'
    },
    {
        label: 'GREEN',
        value: '2'
    },
    {
        label: 'BLUE',
        value: '3'
    },
    {
        label: 'YELLOW',
        value: '4'
    }, {
        label: 'WHITE',
        value: '5'
    },
];
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
var AES = require("react-native-crypto-js").AES;

function LoginScreen({navigation}) {
  const [name, setName] = useState(''); 
  const [sex,setSex] = useState('');
  const [age,setAge] = useState('');
  return (
    
    
    <ScrollView style={styles.scrollView}>  
    <HeaderRNE      
      backgroundColor='black'
      barStyle="default"
      centerComponent={{
        text: "Details",
        style: { color: "#fff",fontSize: 22, fontWeight: "bold" },
      }}      
      containerStyle={{ width: "100%" }}           
      placement="center"          
    />  
     
    <Text></Text>
   
      <Card style={styles.card}>
        <Card.Title title = "Enter Patient Details" />
        
        <Card.Content>
        <TextInput mode="outlined" label="Name" value={name} onChangeText={(text) => setName(text)} style={styles.textInput} /> 
        <TextInput mode = "outlined" label = "Age" value ={age} onChangeText ={(Number) => setAge(Number)} style = {styles.textInput} />
        <TextInput mode = "outlined" label = "Sex" value ={sex} onChangeText ={(text) => setSex(text)} style = {styles.textInput}/>
       <Text></Text>
        <Button  buttonStyle = { {width: '100%',backgroundColor: 'rgba(39, 39, 39, 1)'}} mode="contained" disabled={name.length === 0 || sex.length === 0 || age.length === 0} onPress={() => navigation.navigate('Home',{Name : name,Sex: sex,Age: age})}>
        Enter
        </Button>
        </Card.Content>
        </Card>
    </ScrollView>
    
  )
}

function HomeScreen({ route,navigation }){
    const {Name,Sex,Age} = route.params;
    
    const [value1, setValue_1] = useState(null);
    const [value2, setValue_2] = useState(null);
    const [value3, setValue_3] = useState(null);
    const [value4, setValue_4] = useState(null);
    const [value5, setValue_5] = useState(null);
    
    const [isFocus1, setIsFocus1] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [isFocus3, setIsFocus3] = useState(false);
    const [isFocus4, setIsFocus4] = useState(false);
    const [isFocus5, setIsFocus5] = useState(false);

    const [sliderValue,setSliderValue] = useState(0);
    const [iterValue,setIterValue] = useState(2);
    const [duration,setDuration] = useState(1);  

   
   

    const renderLabel1 = () => {
        if (value1 || isFocus1) {
            return (
                <Text style={[styles.label, isFocus1 && { color: 'blue' }]}>
                 Color1
                </Text>               
            );
        }
        return null;
    };
    const renderLabel2 = () => {
        if (value2 || isFocus2) {
            return (
                <Text style={[styles.label, isFocus2 && { color: 'blue' }]}>
                 Color2
                </Text>               
            );
        }
        return null;
    };
    const renderLabel3 = () => {
        if (value3 || isFocus3) {
            return (
                <Text style={[styles.label, isFocus3 && { color: 'blue' }]}>
                 Color3
                </Text>               
            );
        }
        return null;
    };
    const renderLabel4 = () => {
        if (value4 || isFocus4) {
            return (
                <Text style={[styles.label, isFocus4 && { color: 'blue' }]}>
                 Color4
                </Text>               
            );
        }
        return null;
    };
    const renderLabel5 = () => {
        if (value5 || isFocus5) {
            return (
                <Text style={[styles.label, isFocus5 && { color: 'blue' }]}>
                 Color5
                </Text>               
            );
        }
        return null;
    };

    const isDarkMode = useColorScheme() === 'dark';
   
    
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white

    };

    const updateThingSpeak = async () => {

        
        var str = "";
        if(value1){
            str+=value1;
        }
        if(value2){
            str+=value2;
        }
        if(value3){
            str+=value3;
        }
        if(value4){
            str+=value4;
        }
        if(value5){
            str+=value5;
        }
        if(str == ""){
            str = "12345";
        }
        
        var allfields = JSON.stringify({color: str, intensity: sliderValue, iterations: iterValue, duration: duration});
        var detailfields = JSON.stringify({name: Name, age: Age,sex: Sex});

        const request = new Request('https://api.thingspeak.com/update.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {api_key: "TLANZNS5J12MS789", field1: 1, field2: allfields, field3: detailfields}
            )

        });
        fetch(request).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on API server!');
            }
        }).then((response) => {
            console.debug(response);
            // …
        }).catch((error) => {
            console.error(error);
        });

              navigation.navigate('Data',{Name: Name,Age: Age,Sex: Sex})
    };


    return (
        <SafeAreaProvider style={backgroundStyle}>        
        <HeaderRNE      
      backgroundColor='black'
      barStyle="default"
      centerComponent={{
        text: "Pupil Detection",
        style: { color: "#fff",fontSize: 22, fontWeight: "bold" },
      }}      
      containerStyle={{ width: "100%" }}           
      placement="center"          
    />  

   
      

    <Text style = {styles.HeaderTextStyle}>Select Color Order</Text>
    
    <View style = {styles.row}>
        <View style={styles.container}>
        {renderLabel1()}

        <Dropdown
          style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value1}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            setValue_1(item.value);
            setIsFocus1(false);
          }}
         
        />
        </View>
        <View style={styles.container}>
        {renderLabel2()}

        <Dropdown
          style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus2 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setValue_2(item.value);
            setIsFocus2(false);
          }}
          
        />
         </View>
         

        <View style={styles.container}>
        {renderLabel3()}

        <Dropdown
          style={[styles.dropdown, isFocus3 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus3 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value3}
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={item => {
            setValue_3(item.value);
            setIsFocus3(false);
          }}
         
        />
        </View>       
        <View style={styles.container}>
        {renderLabel4()}
        <Dropdown
          style={[styles.dropdown, isFocus4 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus4 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value4}
          onFocus={() => setIsFocus4(true)}
          onBlur={() => setIsFocus4(false)}
          onChange={item => {
            setValue_4(item.value);
            setIsFocus4(false);
          }}
          
        />
        </View>
        <View style={styles.slidercontainer}>           
        </View>
        </View>

        <View style={styles.lastbot}>
        {renderLabel5()}
        <Dropdown
          style={[styles.droplast, isFocus5 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus5 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value5}
          onFocus={() => setIsFocus5(true)}
          onBlur={() => setIsFocus5(false)}
          onChange={item => {
            setValue_5(item.value);

            setIsFocus5(false);
          }}
       
        />
        </View>         


        
        <Text style = {styles.ChildTextStyle}>Intensity: {sliderValue}</Text>
        <View style={[styles.contentView]}>
      <Slider
        value={sliderValue}
        onValueChange={setSliderValue}
        maximumValue={100}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
       
      />
       </View>
      <Text style = {styles.ChildTextStyle}>Iterations: {iterValue}</Text>
        <View style={[styles.contentView]}>
      <Slider
        value={iterValue}
        onValueChange={setIterValue}
        maximumValue={10}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
       
      />
      </View>

      <Text style = {styles.ChildTextStyle}>Duration: {duration} {duration == 1 ? "sec" :"secs"}</Text>
        <View style={[styles.contentView]}>
      <Slider
        value={duration}
        onValueChange={setDuration}
        maximumValue={10}
        minimumValue={1}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
       
      />
      </View>
   
       
            <Button buttonStyle={
                    {
                     width: 150,
                     backgroundColor: 'rgba(39, 39, 39, 1)'
                    }
                }
            
                containerStyle={
                    {
                        margin: 5,
                        marginTop: 20,
                        alignSelf: 'center',
                        padding: 20,
                        
                    }
                }

                disabledStyle={
                    {
                        borderWidth: 2,
                        borderColor: "#00F"
                    }
                }
                disabledTitleStyle={
                    {color: "#00F"}
                }

                onPress={
                    () => updateThingSpeak()
                }
                title="Start"
                titleProps={
                    {}
                }
                titleStyle={
                    {marginHorizontal: 5}
                }/>

        </SafeAreaProvider>
    );
};
function DataScreen({ route,navigation }){
    const [red_data, setRedData] = useState([]);
    const [green_data, setGreenData] = useState([]);
    const [blue_data, setBlueData] = useState([]);
    const [yellow_data, setYellowData] = useState([]);
    const [white_data, setWhiteData] = useState([]);    
    const [data,setData] = useState([]);
    const [start,setStart] = useState(1);
    const [stop,setStop] = useState(0);  
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => {
        getData();
        setRefreshing(false);
      }, 2000);
    };
    const getData = async () => {
        
        try {
            const response = await fetch(
                'https://api.thingspeak.com/channels/1871939/feeds.json?api_key=TLANZNS5J12MS789&results=1'
            ).then((response) => response.json()).then((json) =>{setRefreshing(false),setData(json.feeds[0])});
          console.log(data);
          var iv = CryptoJS.enc.Utf8.parse('jansarannathi123');
          var key ='sreehaachapra123';
          key = CryptoJS.enc.Utf8.parse(key);
          var decrypted_red =  CryptoJS.AES.decrypt(data.field1, key, { iv: iv, mode: CryptoJS.mode.CBC});
          var decrypted_green = CryptoJS.AES.decrypt(data.field2, key, { iv: iv, mode: CryptoJS.mode.CBC});
          var decrypted_blue = CryptoJS.AES.decrypt(data.field3, key, { iv: iv, mode: CryptoJS.mode.CBC});
          var decrypted_yellow = CryptoJS.AES.decrypt(data.field4, key, { iv: iv, mode: CryptoJS.mode.CBC});
          var decrypted_white = CryptoJS.AES.decrypt(data.field5, key, { iv: iv, mode: CryptoJS.mode.CBC});
          decrypted_red = decrypted_red.toString(CryptoJS.enc.Utf8);
          decrypted_green = decrypted_green.toString(CryptoJS.enc.Utf8);
          decrypted_blue = decrypted_blue.toString(CryptoJS.enc.Utf8);
          decrypted_yellow = decrypted_yellow.toString(CryptoJS.enc.Utf8);
          decrypted_white = decrypted_white.toString(CryptoJS.enc.Utf8);   
          console.log("ide ankunta: " + decrypted_white); 
          setRedData(JSON.parse(decrypted_red.replace(/'/g, '"')).red);
          setGreenData(JSON.parse(decrypted_green.replace(/'/g, '"')).green);
          setBlueData(JSON.parse(decrypted_blue.replace(/'/g, '"')).blue);
          setYellowData(JSON.parse(decrypted_yellow.replace(/'/g, '"')).yellow);
          setWhiteData(JSON.parse(decrypted_white.replace(/'/g, '"')).white);

                       
          }
           catch (error) {
            console.error(error);
          }        
        navigation.navigate('Lottie');
    } 

   
        
   
    return (
      <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <HeaderRNE      
      backgroundColor='black'
      barStyle="default"
      centerComponent={{
        text: "Data Visualization",
        style: { color: "#fff",fontSize: 22, fontWeight: "bold" },
      }}      
      containerStyle={{ width: "100%" }}           
      placement="center"          
     />       
    {Object.keys(red_data).length !== 0 ?
    <LineChart    
        data={{
            datasets: [
              {
                data:red_data,       
              },
            ],
          }}
        width={(Dimensions.get("window").width)*0.95} // from react-native    
        height={220}    
        yAxisSuffix="mm"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#DB2452",
          backgroundGradientFrom: "#DB2452",
          backgroundGradientTo: "#ED622F",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },     
        
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
      
        style={{
          marginVertical: 8,
          borderRadius: 16,
          
          alignItems: 'center',
        }}
      /> : null
      }
      

      {Object.keys(green_data).length !== 0 ?
      <LineChart
          
          data={{
              datasets: [
                {
                  data: green_data,
                }, 
              ],
            }}
          width={(Dimensions.get("window").width)*0.95} 
          height={220}    
          yAxisSuffix="mm"
          yAxisInterval={1} 
          chartConfig={{
            backgroundColor: "#006861",
            backgroundGradientFrom: "#006861",
            backgroundGradientTo: "#81F491",
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          
          style={{
            marginVertical: 8,
            borderRadius: 16,      
            alignItems: 'center',
          }}
        /> : null

        }

      {Object.keys(blue_data).length !== 0 ?
      <LineChart
          
          data={{
              datasets: [
                {
                  data: blue_data,
                },
              ],
            }}
          width={(Dimensions.get("window").width)*0.95}    
          height={220}    
          yAxisSuffix="mm"
          yAxisInterval={1} 
          chartConfig={{
            backgroundColor: "#000DBF",
            backgroundGradientFrom: "#000DBF",
            backgroundGradientTo: "#5E4FE2",
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },               
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        
          style={{
            marginVertical: 8,
            borderRadius: 16,
            
            alignItems: 'center',
          }}
        /> : null
        }

    {Object.keys(yellow_data).length !== 0 ?
    <LineChart
        
        data={{
            datasets: [
              {
                data: yellow_data,
              },
            ],
          }}
        width={(Dimensions.get("window").width)*0.95}    
        height={220}    
        yAxisSuffix="mm"
        yAxisInterval={1} 
        chartConfig={{
          backgroundColor: "#D1BF1F",
          backgroundGradientFrom: "#D1BF1F",
          backgroundGradientTo: "#EFE62F",
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },          
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        
        style={{
          marginVertical: 8,
          borderRadius: 16,
          
          alignItems: 'center',
        }}
      /> : null
    }




   

</ScrollView>
    
    ); 


}

function LottieScreen({navigation}){
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Data');
    }, 5000);})
  return (
    <View style = {{display: 'flex',flex: 1,alignItems: 'center',justifyContent: 'center'}}>
      <LottieView
        source={require("./assets/1402-eye-blinking.json")}
        style={styles.loadinganimation}
        autoPlay
      />
    </View>
  );
}



function SplashScreen({navigation }){

const backgroundFade = useRef(new Animated.Value(0)).current;
const logoFade = useRef(new Animated.Value(0)).current;
const logoMovement = useRef(new Animated.Value(0)).current;
const ButtonFade = useRef(new Animated.Value(0)).current;
   useEffect(() => {
      Animated.timing(backgroundFade, {
         toValue: 1,
         duration: 2000,
         useNativeDriver: true,
      }).start();
      Animated.timing(logoFade, {
         toValue: 1,
         duration: 2000,
         useNativeDriver: true,
      }).start();
      Animated.timing(ButtonFade,{
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
         Animated.timing(logoMovement, {
               toValue: -220,
               duration: 2000,
               easing: Easing.inOut(Easing.exp),
               useNativeDriver: true,
         }).start();
      }, 2250);
   }, []);

   const styles = StyleSheet.create({
      container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: 'black',
         opacity: backgroundFade,
      },
      logo: {
         color: 'white',
         fontSize: 48,
         marginLeft: 10,
         fontWeight: 'bold',
         opacity: logoFade,
         transform: [{translateY: logoMovement}],
      },
      fadebuttonStyle: {
        width: 160,
        backgroundColor: 'white',     
        height: 50,   
        borderRadius: 30,     
      }
   });
   return ( 
     <Animated.View style={styles.container}>
         <Animated.Text style={styles.logo}>Hitomi.</Animated.Text>   
       <Animated.View style={{opacity: ButtonFade}}>
         <Button buttonStyle={styles.fadebuttonStyle}               
                icon={{
                  name: 'eye',
                  type: 'font-awesome',
                  size: 15,
                  color: 'black',
                }}
                iconRight
                iconContainerStyle={{ marginLeft: 10 }}
                containerStyle={
                    {
                        margin: 5,
                        marginTop: 20,
                        alignSelf: 'center',
                        padding: 20,
                        
                    }
                }

                disabledStyle={
                    {
                        borderWidth: 2,
                        borderColor: "#00F"
                    }
                }
                disabledTitleStyle={
                    {color: "#00F"}
                }

                onPress={
                    () => navigation.navigate('Details')
                }
                title="Dive In"
                titleProps={
                    {}
                }
                titleStyle={
                    {marginHorizontal: 5,
                     color: 'black',                     
                    }
                }/>

                </Animated.View>               
      </Animated.View>  
      
      
   );
}


const App: () => Node = () => {
  return (
    <PaperProvider>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Details" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Data" component={DataScreen}/>
        <Stack.Screen name="Lottie" component={LottieScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  )

}

const styles = StyleSheet.create({
  
    HeaderTextStyle:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,

    },
    ChildTextStyle:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      lastbot: {
        backgroundColor: 'white',
        padding: 16,               
      },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    dropdown: {
        height: 50,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,       
        alignSelf: "flex-start", 
    },
    droplast:{
        height: 50,
        width: '50%',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,       
        alignSelf: "center", 
    },
    icon: {
        marginRight: 5
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        width: '50%'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    placeholderStyle: {
        fontSize: 16
    },
    selectedTextStyle: {
        fontSize: 16
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    slidercontainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    },
    contentView: {
        
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
      },
      scrollView: {
        backgroundColor: 'white',
        paddingTop: 10
        },
      card: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',       
        
        },

      textInput: {
          marginBottom: 10,
          backgroundColor: 'white',
      },
      loadinganimation: {
        width: 100,
        height: 100,   
        alignSelf: 'center',
      },

    
});

export default App;






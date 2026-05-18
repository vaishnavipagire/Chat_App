import { View, Text,StyleSheet,Image,TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dots from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/Ionicons';

const Message = () => {

  return (
    <> 
    <View style = {styles.container}>
      <Text style={styles.title}> Chats </Text>
      <Icon name= "search" style={styles.searchicon} />
       <Dots name= "dots-three-vertical" style={styles.dotsicon} />
  </View>

  <View style={styles.container2}>
     <Search name = "search" style={styles.searchicons}  size={20}/>
         <TextInput
          style={styles.searchBar}
          placeholder="Search users"
        />
   </View>
  
<View style={styles.container1}>
    <Icons name = "chat-bubble-outline" style={styles.chaticon} />
        </View>
  </>
  )
}

export default Message;

const styles = StyleSheet.create({
container:{
  backgroundColor:'#065D54',
  paddingTop:20,
  flexDirection:'row',
  paddingLeft:15,
  paddingBottom:20
 },
title:{
  fontSize:20,
  color:'white',
 },
searchicon:{
fontSize:20,
color:'#FFFFFF',
paddingLeft:240,
position:'absoulte',
},
dotsicon:{

  fontSize:20,
  color:'#FFFFFF',
  paddingLeft:20,
  position:'absoulte',
},
container2:{
   paddingTop:20,
   paddingLeft:18,
   },
searchicons:{
    position:'absolute',
    marginTop:30,
    color:'#767779',
    paddingLeft:25,
    zIndex:1,
},
searchBar:{
    borderRadius:9,
    height:40,
    width:360,
    paddingHorizontal:30,
    backgroundColor:'#D9D9D9',
    borderColor:'#F4F4F4',
    color:'#767779',
    alignItems:'center',
},
container1:{
backgroundColor:'#1BC55C',
borderRadius:25,
height:50,
width:50,
marginTop:550,
marginLeft:320,
alignSelf:'center',
},
chaticon:{
    fontSize:25,
    color:'#FFFFFF',
    paddingTop:14,
    alignSelf:'center'
},
});

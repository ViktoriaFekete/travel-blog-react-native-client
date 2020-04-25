import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import { Avatar, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ArticleScreen extends React.Component{

    state = {
        articleTitle: 'Title',
        articleText: 'Text',
        published: '',
    }

  async componentDidMount() {
    try {
        let response = await fetch('http://10.0.2.2:8080/articles/full/24');
        let responseJson = await response.json();
        this.setState({articleTitle: responseJson.title, articleText: responseJson.article_text, published: responseJson.published });

        // console.log(responseJson.title);
        // console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
    }
  }


  render() {
    
    const { articleText, articleTitle, published } = this.state;
    return (

    <ScrollView>
        <View style={{flex:1, alignItems: 'center'}}>
          //TODO Add image picker
            <Image
                source={{ uri: 'http://10.0.2.2:8080/articles/28/photos/0' }}
                style={{ width: 480, height: 130 }}
            />       
            <Avatar containerStyle={{ position: 'absolute', top: 90, borderWidth: 3, borderColor: 'white'}} avatarStyle={styles.profilePhoto}
                rounded
                size="large"
                source={{ uri:'https://www.pedroaraya.cl/wp-content/uploads/2016/06/photo-1438761681033-6461ffad8d80.jpg',}}
            />
        </View>
        <View style={styles.container}>
            <Text style={styles.articleTitle}>{articleTitle}</Text>
            <Text style={styles.date}>{published}</Text>
            <Text style={styles.articleText}>{articleText}</Text>
        </View>
        //TODO Do gallery https://github.com/xiaolin/react-image-gallery 
        <View style={styles.gallery}>
            <Image 
                source={{ uri: 'http://10.0.2.2:8080/articles/28/photos/0' }}
                style={{ width: 200, height: 150 }}
            />
        </View>
        //TODO Add comment section
        <View style={styles.commentSection}>
            <Text>Sem pridu este komenty</Text>
        </View>
    </ScrollView>
  );
}

}

const styles = StyleSheet.create({
  welcomeText:{
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24
  },
  container: {
    paddingTop: 50,
    padding: 20,
    
  },
  contentContainer: {
    paddingTop: 100,
  },
  buttons: {
      paddingTop: 20,
      paddingRight: 60,
      paddingLeft: 60,
      height: 90,  
  },
  btn:{
      height: 40,
      borderWidth: 1.5
  },
  profilePhoto:{
    flex: 1,
    paddingTop: 170,
  },
  articleText:{
    paddingTop: 20,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'justify',
    
  },
  articleTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  saveButton:{
    paddingTop: 30,
    paddingLeft:160,
  },
  coverBtnContainer:{
    height: 130,
    padding: -3
  },
  coverButton:{
    height: 130,
    borderWidth: 2
  },
  date:{
      paddingTop: 10,
      paddingLeft: 150,
      color: 'gray'
  },
  gallery:{
      padding: 10,
      margin: 15,
      backgroundColor: '#0B132B'
  },
  commentSection:{
      padding: 20
  }
});
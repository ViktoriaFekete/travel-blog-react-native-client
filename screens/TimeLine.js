import * as React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Image, Button, ListItem } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon}  from 'react-native-elements'

function getId(item){
  return item.id;
}


export default class TimeLine extends React.Component{

  constructor(){

    super()

    this.state = {
    articles: [],
    imageFound: 'false',
    image: {},
    orderBy: 'd',
  }
}


orderArticles(){
  if (this.state.orderBy == 'd')
    this.setState({ orderBy: 'a'});
  else
    this.setState({ orderBy: 'd'});
  this.componentDidMount()
}

async componentDidMount() {
  try {
      console.log("order by : ", this.state.orderBy)
      let response = await fetch('http://10.0.2.2:8080/articles/tile/?limit=5&&order='+this.state.orderBy);
      let responseJson = await response.json();
      this.setState({articles: responseJson.content });

      return responseJson;
  } catch (error) {
      console.log("fetch ended up in error state in TimeLine")
      console.error(error);
  }
}

// async getBloggerName(bloggerId) {
//   console.log(bloggerId)
//   try {
//       let response = await fetch('http://10.0.2.2:8080/bloggers/'+bloggerId);
//       let responseJson = await response.json();
//       console.log("name : ", responseJson.username)
//       // this.setState({bloggerName: responseJson.username });
//       // console.log("setstate : ", this.state.bloggerName)
//       return responseJson.username;
//   } catch (error) {
//       console.log("fetch ended up in error state in TimeLine")
//       console.error(error);
//   }
// }

keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <Card>
  <Image
    source={{ uri: 'http://10.0.2.2:8080/articles/'+getId(item)+'/photos/0' }}
    style={{ width: '100%', height: 180 }}
  /> 
  <View style={{ flex: 1, flexDirection: 'row'}}>
    {/* <Text>
      {this.getBloggerName(item.bloggerId)}
    </Text> */}
    <Text style={styles.title}>
      {item.title}  {item.bloggerId}  {item.id}
    </Text>
    </View>
  </Card>
  )

render() {

const { articles } = this.state;


//console.log("2. Articles>>  ", this.state.articles);
return (
  <View>
    <View style={{ flexDirection: 'row', position: 'relative', left: 300}}>
    {/* <View style={{ position: 'relative', left: 300}}> */}
    <Icon
        raised
        name='md-arrow-down'
        type='ionicon'
        color='#5BC0BE'
        size={20}
        // onPress={() => console.log('Sort...')} />            
        onPress={this.orderArticles.bind(this)} />
      <Icon
        raised
        name='md-search'
        type='ionicon'
        color='#5BC0BE'
        size={20}
        onPress={() => console.log('Search for...')} />            
    </View>
    <FlatList
      keyExtractor={this.keyExtractor}
      data={articles}
      renderItem={this.renderItem}
      
    />
    </View>
  );
}
}

TimeLine.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  title:{
    flex: 1, 
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  likes:{
    marginTop: 10,
  }
  
});

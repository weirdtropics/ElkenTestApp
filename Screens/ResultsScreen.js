import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text
} from 'react-native';
const DetailScreen = require('./DetailScreen');


class ResultsScreen extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource(
            {rowHasChanged: (r1,r2) => r1.id !== r2.id }
        );
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.photos)
        };
    }


    _rowPressed(selectedPhoto) {
        const photo = this.props.photos.filter(photo => photo === selectedPhoto)[0]
        this.props.navigator.push({
            title: photo.title,
            component: DetailScreen,
            passProps: { photo: photo }
        });
    }


    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor='transparent'
            onPress={() => this._rowPressed(rowData)}>
                <View style={styles.rowContainer}>
                    <Image style={styles.image}
                        source={{ uri: rowData.url_m }}>
                    </Image>
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        return (
            <View style={styles.list}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    contentContainerStyle={styles.list}

                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowContainer: {
        backgroundColor:'transparent',
        padding:5,
    },
    image: {
        flex: 1,
        height: 150,width: 150,
        borderRadius: 10
    },
});

module.exports = ResultsScreen;

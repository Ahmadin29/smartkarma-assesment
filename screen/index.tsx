import { View } from "react-native";
import Search from "../components/Button/search";
import Text from "../components/Text";
import WatchlistWidget from "../components/Watchlist/widget";
import Colors from "../constants/colors";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";

export default function Index() {
    return(
        <View style={{
            flex:1,
            backgroundColor:Colors.white,
        }} >
            <View style={{
                padding:15,
            }} >
                <Text size={20} weight="semi" >Hi, Ahmad Saefudin</Text>    
                <Text color="textSecondary" >Let's start to analyze</Text>    
            </View>
            <Search/>
            <WatchlistWidget/>
        </View>
    )
}
// This has to be a string since we can't natively import a json module yet.
export const save = `{
    "title": "chess-demo",
    "config": {
        "columnCount": 8,
        "rowCount": 8,
        "cellSize": 100,
        "cellGap": 2,
        "backgroundColor": "#18181b",
        "showCoords": true
    },
    "schema": [
        {
            "name": "background_color",
            "type": "color",
            "displayName": "Fill Colors: ",
            "values": [
                {
                    "name": "defaultColor",
                    "hex": "71717A"
                },
                {
                    "name": "darkGrey",
                    "hex": "444444"
                },
                {
                    "name": "highlightColor",
                    "hex": "468E46"
                }
            ]
        },
        {
            "name": "pieces",
            "type": "text",
            "displayName": "Pieces: ",
            "values": [
                {
                    "name": "default",
                    "display": "",
                    "xOffset": 0,
                    "yOffset": 0,
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "100%"
                },
                {
                    "name": "queen",
                    "display": "♕",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "king",
                    "display": "♔",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "knight",
                    "display": "♘",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "pawn",
                    "display": "♙",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "bishop",
                    "display": "♗",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "rook",
                    "display": "♖",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "fff",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "queen-black",
                    "display": "♕",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "38C8BA",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "king-black",
                    "display": "♔",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "38C8BA",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "knight-black",
                    "display": "♘",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "38C8BA",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "pawn-black",
                    "display": "♙",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "38C8BA",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "bishop-black",
                    "display": "♗",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "38C8BA",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                },
                {
                    "name": "rook-black",
                    "display": "♖",
                    "xOffset": "12.5%",
                    "yOffset": "-5%",
                    "color": "38C8BA",
                    "lineHeight": "normal",
                    "fontSize": "240%"
                }
            ]
        },
        {
            "name": "background_image",
            "type": "background",
            "displayName": "Tiles: ",
            "values": [
                {
                    "imageDataUrl": ""
                }
            ]
        }
    ],
    "cellData": [
        {
            "cellId": "0,0",
            "attributes": {
                "background_color": 1,
                "pieces": 12,
                "background_image": 0
            }
        },
        {
            "cellId": "0,2",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "0,4",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "0,6",
            "attributes": {
                "background_color": 1,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "2,0",
            "attributes": {
                "background_color": 1,
                "pieces": 11,
                "background_image": 0
            }
        },
        {
            "cellId": "4,0",
            "attributes": {
                "background_color": 1,
                "pieces": 8,
                "background_image": 0
            }
        },
        {
            "cellId": "6,0",
            "attributes": {
                "background_color": 1,
                "pieces": 9,
                "background_image": 0
            }
        },
        {
            "cellId": "1,1",
            "attributes": {
                "background_color": 1,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "3,1",
            "attributes": {
                "background_color": 1,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "5,1",
            "attributes": {
                "background_color": 1,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "7,1",
            "attributes": {
                "background_color": 1,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "6,2",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "4,2",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "2,2",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "1,3",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "3,3",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "5,3",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "7,3",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "6,4",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "4,4",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "2,4",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "1,5",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "3,5",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "5,5",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "7,5",
            "attributes": {
                "background_color": 1,
                "pieces": 0,
                "background_image": 0
            }
        },
        {
            "cellId": "7,7",
            "attributes": {
                "background_color": 1,
                "pieces": 6,
                "background_image": 0
            }
        },
        {
            "cellId": "5,7",
            "attributes": {
                "background_color": 1,
                "pieces": 5,
                "background_image": 0
            }
        },
        {
            "cellId": "3,7",
            "attributes": {
                "background_color": 1,
                "pieces": 1,
                "background_image": 0
            }
        },
        {
            "cellId": "2,7",
            "attributes": {
                "background_color": 0,
                "pieces": 5,
                "background_image": 0
            }
        },
        {
            "cellId": "1,7",
            "attributes": {
                "background_color": 1,
                "pieces": 3,
                "background_image": 0
            }
        },
        {
            "cellId": "2,6",
            "attributes": {
                "background_color": 1,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "4,6",
            "attributes": {
                "background_color": 1,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "6,6",
            "attributes": {
                "background_color": 1,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "6,1",
            "attributes": {
                "background_color": 0,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "4,1",
            "attributes": {
                "background_color": 0,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "2,1",
            "attributes": {
                "background_color": 0,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "0,1",
            "attributes": {
                "background_color": 0,
                "pieces": 10,
                "background_image": 0
            }
        },
        {
            "cellId": "7,0",
            "attributes": {
                "background_color": 0,
                "pieces": 12,
                "background_image": 0
            }
        },
        {
            "cellId": "1,0",
            "attributes": {
                "background_color": 0,
                "pieces": 9,
                "background_image": 0
            }
        },
        {
            "cellId": "3,0",
            "attributes": {
                "background_color": 0,
                "pieces": 7,
                "background_image": 0
            }
        },
        {
            "cellId": "5,0",
            "attributes": {
                "background_color": 0,
                "pieces": 11,
                "background_image": 0
            }
        },
        {
            "cellId": "1,6",
            "attributes": {
                "background_color": 0,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "3,6",
            "attributes": {
                "background_color": 0,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "5,6",
            "attributes": {
                "background_color": 0,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "7,6",
            "attributes": {
                "background_color": 0,
                "pieces": 4,
                "background_image": 0
            }
        },
        {
            "cellId": "4,7",
            "attributes": {
                "background_color": 0,
                "pieces": 2,
                "background_image": 0
            }
        },
        {
            "cellId": "6,7",
            "attributes": {
                "background_color": 0,
                "pieces": 3,
                "background_image": 0
            }
        },
        {
            "cellId": "0,7",
            "attributes": {
                "background_color": 0,
                "pieces": 6,
                "background_image": 0
            }
        },
        {
            "cellId": "7,2",
            "attributes": {
                "background_color": 0,
                "pieces": 0,
                "background_image": 0
            }
        }
    ]
}
`;
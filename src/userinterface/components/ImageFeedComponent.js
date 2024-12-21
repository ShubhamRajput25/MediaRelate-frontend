import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../css/ImageFeedComponent.css'
import ImageFeedPostComponent from './ImageFeedPostComponent';
import { useMediaQuery, useTheme } from '@mui/material';
export default function ImageFeedComponent({
    data,
    refresh, 
    setRefresh
}) {

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))


    // console.log("image data ",data)
    const showPosts = ()=>{
      return data?.map((item)=>{
        return  <ImageFeedPostComponent data={item} />
      })
    }
    
  return (
    <Box sx={{ width: matches4?'100%': '90%', height: '100vh', overflowY: 'scroll' }}>
      <ImageList variant="quilted"  cols={matches4?3:4} gap={2}>
        {data.map((item) => (
          <ImageListItem key={item?.picture} style={{padding:'0px',cursor:'pointer'}}>
            {/* <img
              srcSet={item?.picture}
              src={item?.picture}  
              alt={item?.picture}
              loading="eager"
              style={{width:'100%'}}
            /> */}
            <ImageFeedPostComponent data={item} refresh={refresh} setRefresh={setRefresh} />
            
          </ImageListItem>
        ))}
      </ImageList>
     {/* {showPosts()} */}
    </Box>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
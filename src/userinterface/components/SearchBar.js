import  "../css/SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props){
    return(<div className="sb-container" style={{width:props.width,height:40,background:'#F1F3F4',borderRadius:10,display:'flex',justifyContent:'space-between',alignItems:'center',paddingLeft:10}}>
        <input  type="text" placeholder='Search...' style={{width:'80%',height:30,border:0,outline:'none',fontSize:18,color:'#636e72',background:'transparent'}}/>
        <SearchIcon   style={{color:'black',fontSize:44,padding:10,paddingRight:10}}/>
    </div>) 
}
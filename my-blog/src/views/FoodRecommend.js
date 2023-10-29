import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import {useEffect, useState} from "react";
import axios from '../api/api'

function FoodRecommend() {
  const [locations, setLocations] = useState([])

  useEffect(()=>{
    axios.get("/restaurants").then(
        (result)=>{
          setLocations(result.data)
        }
    )
  },[])

  return (
    <>
      <DashboardCard title="학교 근처 맛집 추천 (localhost에서만 사용가능)">
        <div style={{ width: '800px', height: '600px', display: 'inline-block' }}>
          <Map
            center={{ lat: 37.45033582239413, lng: 127.12998395772455 }}
            style={{ width: '100%', height: '100%' }}
            level={3}
          >
            {locations && locations.map((loc, idx) => (
              <>
                <MapMarker
                  key={`${loc.name}-${loc.lat}-${loc.lng}`}
                  position={{lat: loc.lat, lng: loc.lng}}
                  image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                    size: { width: 24, height: 35 },
                  }}
                  title={loc.name}
                />
                <CustomOverlayMap position={{lat: loc.lat, lng: loc.lng}}>
                  <div
                    style={{
                      color: 'black',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      backgroundColor: 'lightgray',
                    }}
                  >
                    {loc.name}
                  </div>
                </CustomOverlayMap>
              </>
            ))}
          </Map>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>맛집 이름</TableCell>
                <TableCell>카테고리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((loc, idx) => (
                <TableRow key={loc.name}>
                  <TableCell>{loc.name}</TableCell>
                  <TableCell>{loc.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </>
  );
}
export default FoodRecommend;

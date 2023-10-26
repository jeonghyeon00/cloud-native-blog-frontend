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

function FoodRecommend() {
  const locations = [
    {
      name: '라쿵푸마라탕',
      latlng: { lat: 37.4477931214038, lng: 127.127457380749 },
      category: '중식',
    },
    {
      name: '육연차',
      latlng: { lat: 37.4488403598708, lng: 127.127131534265 },
      category: '일식',
    },
    {
      name: '준호네 부대찌개',
      latlng: { lat: 37.4483605061686, lng: 127.1271073288 },
      category: '한식',
    },
    {
      name: '화리화리',
      latlng: { lat: 37.4469148573937, lng: 127.127332936337 },
      category: '한식',
    },
    {
      name: '화로상회',
      latlng: { lat: 37.4535906209516, lng: 127.127270676682 },
      category: '한식',
    },
  ];

  return (
    <>
      <DashboardCard title="학교 근처 맛집 추천 (localhost에서만 사용가능)">
        <div style={{ width: '800px', height: '600px', display: 'inline-block' }}>
          <Map
            center={{ lat: 37.45033582239413, lng: 127.12998395772455 }}
            style={{ width: '100%', height: '100%' }}
            level={3}
          >
            {locations.map((loc, idx) => (
              <>
                <MapMarker
                  key={`${loc.name}-${loc.latlng.lat}-${loc.latlng.lng}`}
                  position={loc.latlng}
                  image={{
                    src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                    size: { width: 24, height: 35 },
                  }}
                  title={loc.name}
                />
                <CustomOverlayMap position={loc.latlng}>
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

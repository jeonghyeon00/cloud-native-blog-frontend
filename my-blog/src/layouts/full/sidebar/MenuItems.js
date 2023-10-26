import { FoodBank } from '@mui/icons-material';
import { Icon24Hours, IconCopy, IconLayoutDashboard, IconLogin, IconUserPlus } from '@tabler/icons';

import { uniqueId } from 'lodash';

let Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: '나의 소개',
    icon: IconLayoutDashboard,
    href: '/information',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: '주식 정보',
    icon: Icon24Hours,
    href: '/stocks',
  },
  {
    id: uniqueId(),
    title: '게시판',
    icon: IconCopy,
    href: '/boards',
  },
  {
    id: uniqueId(),
    title: 'Todo 리스트',
    icon: IconCopy,
    href: '/todo',
  },
  {
    id: uniqueId(),
    title: '학교 근처 맛집 추천',
    icon: FoodBank,
    href: '/map',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: '로그인',
    icon: IconLogin,
    href: '/auth/login',
    login: false,
  },
  {
    id: uniqueId(),
    title: '회원가입',
    icon: IconUserPlus,
    href: '/auth/register',
    login: false,
  },
  {
    id: uniqueId(),
    title: '로그아웃',
    icon: IconUserPlus,
    href: '/auth/login',
    login: true,
  },
];

export default Menuitems;

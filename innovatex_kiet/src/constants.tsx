import { Icon } from '@iconify/react';
import { useRouter } from 'next/router'; 
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Feeds',
    path: '/user/feeds',
    icon: <Icon icon="lucide:home" width="24" height="24" />,

    isBottom: false,

  },
  {
    title: 'Profile',
    path: '/user/profile',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    isBottom: false,
  },
  {
    title: 'Messages',
    path: '/user/messages',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,

    isBottom: false,

  },
  {
    title: 'Notification',
    path: '/user/notification',

    icon: <Icon icon="lucide:bell" width="24" height="24" />,
    isBottom: false,
  },  

  {
    title: 'Settings',
    path: '/user/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [

      { title: 'Account', path: '/settings/account', isBottom: true},
      { title: 'Privacy', path: '/settings/privacy' ,isBottom: true},
    ],
    isBottom: true,

  },
  {
    title: 'About',
    path: '/user/about',

    icon: <Icon icon="lucide:info" width="24" height="24" />,
    isBottom: true,
  },

  // {
  //   title: 'Logout',
  //   path: '/users/login',
  //   icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  //   isBottom: true,
  // }

   {
    title: 'Logout',
    path: '/user/logout',
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    isBottom: true,
    // onClick: async () => {
    //   // Your logout logic here
    //   const response = await fetch('/api/users/logout', {
    //     method: 'GET',
    //   });

    //   if (response.ok) {
    //     // Clear the token from cookies
    //     document.cookie = 'token=; Max-Age=0; path=/';
    //     alert('Logged out successfully');
    //     // Redirect to login
    //     window.location.href = '/users/login'; // Use window.location.href to navigate
    //   } else {
    //     const errorData = await response.json();
    //     alert(`Error: ${errorData.message}`);
    //   }
    // },
  },
];


// ensures that when you log out you can no longer go back to the dashboard

export {default} from 'next-auth/middleware';

export const config = {matcher: ['/dashboard']}; // matcher are pages we want protected
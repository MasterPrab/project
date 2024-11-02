/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['.google.com'],
       }, 
       experimental:{
        serverActions:true
       }
};

export default nextConfig;

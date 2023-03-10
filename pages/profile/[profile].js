import {Image} from '@mantine/core';

function Profile() {
  var img_link = "" + session?.user?.image;
  console.log(img_link);
  return( 
  <Image width={240} mx = "auto" radius="md" src={img_link} alt="Random image" />
  

  );
}

export default Profile;

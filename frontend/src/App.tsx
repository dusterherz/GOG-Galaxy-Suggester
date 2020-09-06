import React from 'react';
import GameDetails from './components/GameDetails';

function App() {
  return (
    <GameDetails
      title={'Kerbal Space Program'}
      summary={"In KSP, you must build space-worthy craft, capable of flying your crew out into space, without killing them. At your disposal is a collection of parts, which must be assembled to create a functional ship. Each part has its own function and will affect the way a ship flies (or doesn't). So strap yourself in, and get ready to try some Rocket Science!\n\nThe game has different game modes, you can play the Career Mode if you want to expand and manage your own Space Center, taking on missions and researching new technologies. Or you can play Sandbox mode if you're only interested in flying and discovering the Kerbal universe without restrictions. There is even a mid point between these two, Science mode."}
      platformList={['Steam']}
      criticsScore={87}
      developers={['Flying Tiger Developments', 'Squad']}
      publishers={['Deported B.V.', 'Squad']}
      genres={['Indie', 'Simulator']}
      themes={['Educational', 'Open world', 'Sandbox', 'Science fiction']}
      releaseDate={new Date('2015-04-27')}
      gameMinutes={223}
      backgroundImage={'https://images.gog.com/4d2680caf0bda7eeb4f90e3d9bccba500629cb0ec267dd1ec15bd38c9edcfec0_glx_bg_top_padding_7.webp?namespace=gamesdb'}
      squareIcon={'https://images.gog.com/2f6964251817bcc0e4044de681f9cc40fa399f8bf39f16d98b6ba7d199bae2da_glx_square_icon_v2.webp?namespace=gamesdb'}
      verticalCover={'https://images.gog.com/2f6964251817bcc0e4044de681f9cc40fa399f8bf39f16d98b6ba7d199bae2da_glx_vertical_cover.webp?namespace=gamesdb'} />
  );
}

export default App;

export function FavIcons() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </>
  );
}

export const SocialLinks = () => {
  return (
    <>
      {/* facebook */}
      <meta property="og:site_name" content="LGU Time-Table V2" />
      <meta property="og:url" content="https://lgutimetable.vercel.app/" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="LGU Time-Table V2" />
      <meta
        property="og:description"
        content="A non-official blazingly 🔥 fast website to access the LGU timetable."
      />
      <meta
        property="og:image"
        itemProp="image"
        content="https://repository-images.githubusercontent.com/561355227/d680f52c-5ae8-4451-af89-b12cfd9b4236"
      />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="lgutimetable.vercel.app" />
      <meta property="twitter:url" content="https://lgutimetable.vercel.app/" />
      <meta name="twitter:title" content="LGU Time-Table V2" />
      <meta
        name="twitter:description"
        content="A non-official blazingly 🔥 fast website to access the LGU timetable."
      />
      <meta
        name="twitter:image"
        content="https://repository-images.githubusercontent.com/561355227/d680f52c-5ae8-4451-af89-b12cfd9b4236"
      />
    </>
  );
};

export const ContributeSocialLinks = () => {
  return (
    <>
      {/* facebook */}
      <meta property="og:site_name" content="LGU Time-Table V2" />
      <meta property="og:url" content="https://lgutimetable.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="LGU Time-Table V2" />
      <meta
        property="og:description"
        content="A non-official blazingly 🔥 fast website to access the LGU timetable."
      />
      <meta property="og:image" itemProp="image" content="/images/contribute.png" />
      <meta property="og:updated_time" content="1440432930" />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="lgutimetable.vercel.app" />
      <meta property="twitter:url" content="https://lgutimetable.vercel.app/" />
      <meta name="twitter:title" content="LGU Time-Table V2" />
      <meta
        name="twitter:description"
        content="A non-official blazingly 🔥 fast website to access the LGU timetable."
      />
      <meta name="twitter:image" content="/images/contribute.png" />
    </>
  );
};

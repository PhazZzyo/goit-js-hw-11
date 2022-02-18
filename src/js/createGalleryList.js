const imageWrapper = data => {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = data;

  return `
  <a class="gallery-link" href="${largeImageURL}">
  <div class="photo-card">
    
  <img src='${webformatURL}' alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      '${likes}'
    </p>
    <p class="info-item">
      <b>Views</b>
      '${views}'
    </p>
    <p class="info-item">
      <b>Comments</b>
      '${comments}'
    </p>
    <p class="info-item">
      <b>Downloads</b>
      '${downloads}'
    </p>
  </div>
  
</div>
</a>
`;
};

export const createGalleryList = data => {
  // if (countries.length === 1) {
  //   return countries.map(country => countryBigCard(country)).join('');
  // }
  // return imageWrapper(data);
  return data.map(images => imageWrapper(images)).join('');
};

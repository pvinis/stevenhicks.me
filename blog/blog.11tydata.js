const getShareImage = require('@jlengstorf/get-share-image').default;

module.exports = {
  eleventyComputed: {
    shareImage: (data) => {
      return getShareImage({
        cloudName: 'pepopowitz',
        // can't specify taglineWidth independent of titleWidth, so passing a line-break
        //   forces Steven Hicks to appear wrapped.
        tagline: `Steven
Hicks`,
        taglineColor: 'ffffff',
        taglineExtraConfig: '_bold',
        taglineFont: 'Quattrocento',
        taglineFontSize: 40,
        taglineGravity: 'center',
        taglineLeftOffset: 405,
        taglineTopOffset: 175,
        textAreaWidth: 600,
        title: data.title,
        titleExtraConfig: '_bold',
        titleFont: 'Quattrocento',
        titleFontSize: 68,
        titleGravity: 'center',
        titleLeftOffset: -190,
        titleBottomOffset: 0,
        imagePublicID: 'steve-hicks-share-3',
        textColor: 'ffffff',
      });
    },
  },
};

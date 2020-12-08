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
        taglineColor: 'fef5e8',
        taglineFont: 'Quattrocento',
        taglineExtraConfig: 'w_200',
        taglineFontSize: 40,
        taglineGravity: 'center',
        taglineLeftOffset: 390,
        taglineTopOffset: 175,
        textAreaWidth: 600,
        title: data.title,
        titleFont: 'Quattrocento',
        titleFontSize: 68,
        titleGravity: 'center',
        titleLeftOffset: -180,
        titleBottomOffset: 0,
        imagePublicID: 'steve-hicks-share-2',
        textColor: 'fef5e8',
      });
    },
  },
};

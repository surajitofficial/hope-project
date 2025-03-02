const sidebar1 = require('assets/images/sidebar1.jpg');
//  you can import sidebar1, sidebar2, .... up to sidebar8 
const themeConfig = {
  sidebar: 'sky', // You can put light, dark, gredient1, gredient2, gredient3.....up to...gredient8 as per your need
  topbar: 'sky', // You can put light, dark, gredient1, gredient2, gredient3.....up to...gredient8 as per your need
  footer: 'sky', // You can put light, dark, gredient1, gredient2, gredient3.....up to...gredient8 as per your need
  layout: 'theme1', // You can put theme1, theme2, theme3.....up to...theme7
  theme: 'themedefault', // Theme is fix you can not change
};
const themeSettings = {
    toolbarAlignValue: 'below', // below or above
    footerAlignValue: 'below', // below or above
    toolbarDisplayValue: 'show',  // show or hide
    footerDisplayValue: 'show', // show or hide
    sidebarTransParentValue: 'off', // off or on
    transparentImage: sidebar1,
    activeLinkStyle: 'style3', // style1, style2, style3, style4
    sidebarMiniValue: 'off', // off or on
    sidebarTransParentActiveBack: 'hsla(0,0%,100%,.23)', // when you use transparentImage at that time you can put any back color for active link
    sidebarTransParentActiveColor: '#E91E63', // when you use transparentImage at that time you can put any text color for active link,
    layout: 'vertical' // vertical or horizontal layout
}
const language = 'english'; // You can put chinese, spanish, french, italian as per your need
export {
  themeConfig,
  language,
  themeSettings
};
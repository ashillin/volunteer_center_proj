  const sites = [
    {siteName: "Valentine Ave", siteAddy: "2544 Valentine", volunteerIndex: ["0"]}, 
    {siteName: "University Heights", siteAddy: "149th street 3rd Ave", volunteerIndex: ["1"]}, 
    {siteName: "Fordham University", siteAddy: "Fordham Road", volunteerIndex: ["2"]},
  ];

exports.add = (site) => {
    sites.push(site);
};

exports.get = (idx) => {
  return sites[idx];
};

exports.upsert = (site) => {
  if (site.id) {
    exports.update(site);
  } else {
    exports.add(site);
  }
};

exports.update = (site) => {
  sites[site.id] = site;
}
  exports.all = sites;
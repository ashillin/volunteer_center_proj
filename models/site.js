  const sites = [
    {siteName: "Valentine Ave", siteAddy: "2544 Valentine", createDate: "September 21st, 2005", volunteerIds: ["0", "2"]}, 
    {siteName: "University Heights", siteAddy: "149th street 3rd Ave", createDate: "August 21st, 2013", volunteerIds: ["1"]}, 
    {siteName: "Fordham University", siteAddy: "Fordham Road", createDate: "May 21st, 2026", volunteerIds: ["2"]},
  ];

exports.add = (site) => {
    sites.push(site);
};

exports.get = (idx) => {
  return sites[idx];
};

exports.upsert = (site) => {
  if (site.volunteerIds && ! Array.isArray(site.volunteerIds)) {
    site.volunteerIds = [site.volunteerIds];
  }
  if (site.id) {
    exports.update(site);
  } else {
    exports.add(site);
  }
};

exports.update = (site) => {
  sites[site.id] = site;
};

exports.all = sites;
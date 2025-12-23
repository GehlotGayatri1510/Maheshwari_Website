const SidebarData = [
  {
    label: "Menu",
    isMainMenu: true,
  },
  {
    label: "DASHBOARD",
    icon: "bx bx-home-circle icon nav-icon text-dark",
    issubMenubadge: true,
    url: "/dashboard"
  }, 
   
  {
    label: "Pages", 
    isMainMenu: true,
  },
 
  {
    label: "MASTERS",
    icon: "bx bx-cog icon nav-icon",
    subItem: [ 
      { sublabel: "Booking Master", link: "/BookingMaster" },
      { sublabel: "City Master", link: "/CityMaster" },
      { sublabel: "Caste Master", link: "/CasteMaster" },
      { sublabel: "Matrimonial Master", link: "/MatrimonialMaster" },
      { sublabel: "Occupation Master", link: "/OccupationMaster" },
      { sublabel: "User Master", link: "/UserMaster" }, 
    ],
  },

];

export default SidebarData;

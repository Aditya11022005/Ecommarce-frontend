// This is a minimal static dataset for Maharashtra districts, talukas, cities, and pincodes for demo.
// In production, use a real API or a much larger dataset.
export const maharashtraLocations = [
  {
    district: 'Pune',
    talukas: [
      { name: 'Haveli', cities: [ { name: 'Pune City', pincode: '411001' }, { name: 'Wagholi', pincode: '412207' } ] },
      { name: 'Mulshi', cities: [ { name: 'Pirangut', pincode: '412115' } ] },
    ]
  },
  {
    district: 'Mumbai',
    talukas: [
      { name: 'Mumbai City', cities: [ { name: 'Mumbai', pincode: '400001' } ] },
      { name: 'Kurla', cities: [ { name: 'Kurla', pincode: '400070' } ] },
    ]
  },
  {
    district: 'Nashik',
    talukas: [
      { name: 'Nashik', cities: [ { name: 'Nashik City', pincode: '422001' } ] },
    ]
  },
  {
    district: 'Nagpur',
    talukas: [
      { name: 'Nagpur', cities: [ { name: 'Nagpur City', pincode: '440001' } ] },
    ]
  },
];

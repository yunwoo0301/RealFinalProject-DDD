import create from 'zustand';

const useStore = create((set) => ({ 
    
    showPage : '마이페이지',
    setShowPage : (page) => set({showPage : page}),

    memberData : [],
    setMemberData : (data) => set((state) => ({memberData : data})),

    myDiaryData : [],
    setMyDiaryData :(data) => set((state) => ({myDiaryData : data})),

    stealExhibition : [],
    setStealExhibition : (data) => set((state) => ({stealExhibition : data})),

    profileImg : {},
    setProfileImg : (data) => set((state)=> ({profileImg : data})),

    search: "",
    setSearch: (word) => set({ search: word }),

    filterExhibition: [],
    setFilterExhibition : (data) => set((state) =>  ({filterExhibition : data})),

}));


export default useStore;

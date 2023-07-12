import create from 'zustand';

const useStore = create((set) => ({ 
    
    showPage : '마이페이지',
    setShowPage : (page) => set({showPage : page}),

    memberData : [],
    setMemberData : (data) => set((state) => ({memberData : data})),

    myDiaryData : [],
    setMyDiaryData :(data) => set((state) => ({myDiaryData : data})),

    profileImg : [],
    setProfileImg : (data) => set((state) => ({profileImg : data})),

    stealExhibition : [],
    setStealExhibition : (data) => set((state) => ({stealExhibition : data})),

    ratings: {},
    setRating: (index, rating) => set(state => ({ ratings: { ...state.ratings, [index]: rating }})),
    
    comments: {},
    setComment: (index, comment) => set(state => ({ comments: { ...state.comments, [index]: comment }})),



}));


export default useStore;

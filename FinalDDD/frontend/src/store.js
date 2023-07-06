import create from 'zustand';

const useStore = create((set) => ({ 
    
    showPage : '마이페이지',
    setShowPage : (page) => set({showPage : page}),

    memberData : [],
    setMemberData : (data) => set((state) => ({memberData : data})),

    myDiaryData : [],
    setMyDiaryData :(data) => set((state) => ({myDiaryData : data})),


}));


export default useStore;

export const viewDateButtons = (botonesByUser, buttons) => {
    
    const views = buttons
      .map(vista => ({
        viewName: vista.viewName,
        viewType: vista.viewType,
        showAgenda: false,
        isEventPerspective: false,
      }));
  
    return views;
};
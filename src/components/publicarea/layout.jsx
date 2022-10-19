import React from 'react'
import './layout.scss'

function Index({children})
{
    return <div className="mainbody" style={{margin:-15,height:'calc(100vh - 65px)',overflowY:'auto',background:'url(/images/pp-BG.jpg)'}}>
        {children}
    </div>
}
export default Index;
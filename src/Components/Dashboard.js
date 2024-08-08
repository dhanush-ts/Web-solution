import React from 'react'
import { TopPerformersChart } from './DashComponents/BarTop5'
import { BottomPerformersChart } from './DashComponents/BarBottom5'
import { InteractionLinePlot } from './DashComponents/LineInter'

export const Dashboard = ({id}) => {
  return (
    <div >
      <div className='flex my-5'>
        <TopPerformersChart id={id} />
        <BottomPerformersChart id={id} />
        </div>
        <InteractionLinePlot id={id} />
    </div>
  )
}

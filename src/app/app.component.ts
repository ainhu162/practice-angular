import { Component, OnChanges, SimpleChange } from '@angular/core';
import { data } from './data';
import { CheckboxItem } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'shift-select';
  public data: CheckboxItem[]
  public startNodeId: number

  constructor() {
    this.data = data
  }
  trackById(_, item): number {
    return item.id;
  }

  public handleToggle({idFirst, idEnd}): void {
    const selectedRange = this.selectRangeNode(idFirst, idEnd)
    const status = !!selectedRange[0]?.value 
    this.updateNodes(selectedRange, status)   
  }
  public saveNodeHandler(id):void {
    this.startNodeId = id
  }

  private selectRangeNode(start, end): CheckboxItem[] {
    const [firstIndex, endIndex] = this.data.reduce((result: number[], item: CheckboxItem, index: number): number[] => {
      if([start, end].includes(item.id)) {
        result.push(index)
      }
      return result
    }, [])
    return this.data.filter((_, index) => index >= firstIndex && index <= endIndex)
  }

  private updateNodes(nodes: CheckboxItem[], status: boolean): void {
    this.data = this.data.map((item, index) => {
      if(nodes.some(node => node.id === item.id)) {
        return {...item, value: status}
      }
      return item
    })
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckboxItem } from 'src/app/model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input()
  item: CheckboxItem;
  @Input()
  startNodeId: number

  @Output()
  toggleHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  saveStartNodeId: EventEmitter<any> = new EventEmitter<any>();

  handleChange($event: any) {
    this.item.value = !this.item.value

    if ($event.shiftKey && this.startNodeId) {
      this.toggleHandler.emit({idFirst: this.startNodeId, idEnd: this.item.id})
    }
    this.saveStartNodeId.emit(this.item.id)
  }
}

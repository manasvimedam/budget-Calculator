import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-list-item',
  templateUrl: './budget-list-item.component.html',
  styleUrls: ['./budget-list-item.component.scss'],
})
export class BudgetListItemComponent implements OnInit {
  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<updateEvent> = new EventEmitter<updateEvent>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onDeleteButtonClick(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClick(item: BudgetItem) {
    //show the edit modal
    let dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //check is result has a value
      if (result) {
        //result is the unpadted budget item
        // replace item with the undated submitted item from the form
        // this.budgetItems[this.budgetItems.indexOf(item)] = result;

        this.update.emit({
          old: item,
          new: result,
        });
      }
    });
  }
}

export interface updateEvent {
  old: BudgetItem;
  new: BudgetItem;
}

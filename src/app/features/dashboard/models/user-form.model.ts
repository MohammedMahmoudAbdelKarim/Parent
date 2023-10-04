import { FormControl, FormGroup } from '@angular/forms';

export interface UserFormModel extends FormGroup {
  name?: FormControl<string | null>;
  job?: FormControl<string | null>;
}

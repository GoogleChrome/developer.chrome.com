import {loadMore} from '../../../../../site/_js/misc/load-more';

(async function () {
  try {
    window.instance1 = await loadMore(
      document.getElementById('button1'),
      document.getElementById('container1'),
      () => {
        return [
          '<div>1</div>',
          '<div>2</div>',
          '<div>3</div>',
          '<div>4</div>',
          '<div>5</div>',
        ];
      },
      () => {},
      {
        take: 5,
        skip: 0,
        total: 11,
      }
    );
  } catch (e) {
    window.instance1Error = e.message;
  }

  try {
    window.instance2 = await loadMore(
      document.getElementById('button2'),
      document.getElementById('container2'),
      () => {
        return [
          '<div>1</div>',
          '<div>2</div>',
          '<div>3</div>',
          '<div>4</div>',
          '<div>5</div>',
        ];
      },
      () => {},
      {
        take: 5,
        skip: 0,
      }
    );
  } catch (e) {
    window.instance2Error = e.message;
  }
})();

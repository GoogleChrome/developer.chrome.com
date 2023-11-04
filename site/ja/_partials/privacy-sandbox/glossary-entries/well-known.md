.well-known は、標準化された URL からウェブサイトへのリダイレクトを追加するために使用されるファイルです。

たとえば、パスワードマネージャーは、ウェブサイトが `/.wellknown/change-password` からそのサイトのパスワード変更ページへのリダイレクトを設定すると、ユーザーがパスワードを更新しやすくすることができます。

さらに、リクエストを発行する *前に* 、ホストに関するポリシーやその他の情報にアクセスすると便利です。 たとえば、`robots.txt` は、アクセスするページと無視するページをウェブクローラに指示します。 IETF [RFC8615](https://tools.ietf.org/html/rfc8615) には、サイト全体のメタデータを `/.well-known/` サブディレクトリの標準的な場所でアクセスできるようにするための標準化された方法が概説されています。

`.well-known` の推奨リストについては、[iana.org/assignments/well-known-uris/well-known-uris.xhtml](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml) を参照してください。
